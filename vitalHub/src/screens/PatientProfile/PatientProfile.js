import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { InputBox } from "../../components/InputBox/InputBox";
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import {
  ButtonLarge,
  BlockedSmallButton,
} from "../../components/Button/Button";
import { userDecodeToken, userLogoutToken } from "../../utils/Auth";
import api from "../../services/Services";
import moment from "moment/moment";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonCamera, ImageView } from "./Style";

export const PatientProfile = ({ navigation, route }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [editable, setEditable] = useState(false);
  const [token, setToken] = useState({});
  const [pacienteData, setPacienteData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [birthDateInput, setBirthDateInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userToken = await userDecodeToken();
      if (userToken && userToken.idUsuario) {
        setToken(userToken);
        try {
          const response = await api.get(
            `/Pacientes/BuscarPorId?id=${userToken.idUsuario}`
          );
          const { endereco, dataNascimento, cpf, foto } = response.data;
          setPacienteData(response.data);
          setPhoto(response.data.idNavigation.foto);
          setLogradouro(endereco.logradouro);
          setCidade(endereco.cidade);
          setDataNascimento(dataNascimento);
          setBirthDateInput(moment(dataNascimento).format("DD/MM/YYYY"));
          setCpf(cpf);
          setCep(endereco.cep);
        } catch (error) {
          console.error("Erro ao buscar dados do paciente:", error);
        }
      } else {
        console.error("Token is not valid or idUsuario is not present.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params != null) {
      AlterarFotoPerfil();
    }
  }, [route.params]);

  useEffect(() => {}, [photo]);

  async function AlterarFotoPerfil() {
    const userToken = await userDecodeToken();
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.photoUri,
      name: `image.${route.params.photoUri.split(".")[1]}`,
      type: `image/${route.params.photoUri.split(".")[1]}`,
    });

    await api
      .put(`/Usuario/AlterarFotoPerfil?id=${userToken.idUsuario}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPhoto(route.params.photoUri);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = () => {
    userLogoutToken();
    navigation.replace("Login");
  };

  const handleCepChange = async (newCep) => {
    setCep(newCep);
    if (newCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${newCep}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setLogradouro(data.logradouro);
          setCidade(data.localidade);
        } else {
          console.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao consultar ViaCEP:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await api.put(
        `/Pacientes?idUsuario=${token.idUsuario}`,
        {
          logradouro: logradouro,
          cep: cep,
          cidade: cidade,
          dataNascimento: moment(birthDateInput, "DD/MM/YYYY").toISOString(),
          cpf: cpf,
        },
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(token.token).token,
          },
        }
      );

      console.log("Dados do paciente atualizados com sucesso.");
      setEditable(false);
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      Alert.alert("Erro", "Falha ao atualizar os dados.");
    }
  };

  const handleNascimentoChange = (text) => {
    let formattedText = text.replace(/\D/g, ""); // Remove all non-numeric characters

    if (formattedText.length > 2) {
      formattedText =
        formattedText.substring(0, 2) + "/" + formattedText.substring(2);
    }
    if (formattedText.length > 5) {
      formattedText =
        formattedText.substring(0, 5) + "/" + formattedText.substring(5, 9);
    }

    setBirthDateInput(formattedText);
  };

  return (
    <ScrollContainer>
      <Container>
        <ImageView>
          <ImagemPerfilPaciente source={{ uri: photo }} />
          <ButtonCamera
            onPress={() => {
              navigation.navigate("PatientCamera");
            }}
          >
            <MaterialCommunityIcons
              name="camera-plus"
              size={20}
              color={"#fbfbfb"}
            />
          </ButtonCamera>
        </ImageView>
        <TitleProfile>{token.name}</TitleProfile>
        <DescriptionPassword description={token.email} />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="Data de nascimento:"
          placeholder="Ex. 04/05/1999"
          keyboardType="numeric"
          fieldValue={birthDateInput}
          editable={editable}
          onChangeText={handleNascimentoChange}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="CPF"
          placeholder="CPF..."
          keyboardType="numeric"
          maxLength={11}
          fieldValue={cpf}
          editable={editable}
          onChangeText={setCpf}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="Endereço"
          placeholder="Endereço..."
          editable={false}
          fieldValue={logradouro}
          fieldWidth={90}
        />
        <ContainerCepCidade>
          <InputBox
            placeholderTextColor="#A1A1A1"
            textLabel="CEP"
            placeholder="CEP..."
            maxLength={9}
            keyboardType="numeric"
            fieldValue={`${cep.slice(0, 5)}-${cep.slice(5, 9)}`}
            editable={editable}
            onChangeText={handleCepChange}
            fieldWidth={40}
          />
          <InputBox
            placeholderTextColor="#A1A1A1"
            textLabel="Cidade"
            placeholder="Cidade..."
            editable={false}
            fieldValue={cidade}
            fieldWidth={40}
          />
        </ContainerCepCidade>
        {editable ? (
          <ButtonLarge text="Salvar" onPress={handleSave} />
        ) : (
          <ButtonLarge text="Editar" onPress={() => setEditable(true)} />
        )}
        <BlockedSmallButton onPress={handleLogout} text="Sair do app" />
      </Container>
    </ScrollContainer>
  );
};

export default PatientProfile;
