import { StatusBar } from "react-native";
import {
  Container,
  FlatContainerSelect,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { TitleSelect } from "../../components/Title/StyleTitle";
import { CardSelectDoctor } from "../../components/Cards/Cards";
import { ButtonLarge, ButtonLargeSelect } from "../../components/Button/Button";
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions";
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions";
import { useEffect, useState } from "react";
import api from "../../services/Services";

export const SelectDoctor = ({ navigation }) => {
  // Criar o state para receber a lista de médicos (Array)
  const [medico, setMedico] = useState([]); // vazio no inicio

  //Criar a função para obter a lista de médicos da api e setar no state
  async function ListarMedico() {
    await api.get("/Medicos").then(async (response) => {
      const dados = response.data;
      // console.log(dados);

      const medicos = dados.map((item) => ({
        id: item.idNavigation.id,
        crm: item.crm,
        nome: item.idNavigation.nome,
        especialidade: item.especialidade.especialidade1,
        foto: item.idNavigation.foto,
      }));

      setMedico(medicos);
      console.log(medicos);
    });
  }

  //Criar um effect para chamada de função
  useEffect(() => {
    ListarMedico();
  }, []);

  const image = require("../../assets/ImageCard.png");

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TitleSelect>Selecionar Médico</TitleSelect>

      {/* // Passar os dados do state(array) para o flatlist */}
      <FlatContainerSelect
        data={medico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Passar o médico como props no MedicalCard
          <CardSelectDoctor
            doctorArea={item.especialidade}
            name={item.nome}
            url={image}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          navigation.navigate("SelectDate");
        }}
        text={"Continuar"}
      />

      <CardCancelLessLocal
        onPressCancel={() => navigation.replace("Main")}
        text={"Cancelar"}
      />
    </Container>
  );
};
