import { Keyboard, ActivityIndicator, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import {
  BoxNumeric,
  Container,
} from "../../components/Container/StyleContainer";
import {
  CodeResend,
  EmailDescription,
} from "../../components/Descriptions/Descriptions";
import { NumericInput } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import { Title } from "../../components/Title/StyleTitle";
import CodeInput from "../../components/CodeInput/CodeInput";
import { useState, useRef } from "react";
import api from "../../services/Services";
import { Button } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

export const CheckEmail = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const numberOfInputs = 4; // Número de campos de entrada no código

  async function indicator() {
    setLoading(true);
  }

  // const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // function focusNextInput( index ){
  //     //Verificar se o index é menor do que a quantidade de campos

  //     if (index < inputs.length - 1) {
  //         inputs[index + 1].current.focus()
  //     }
  // }

  // function focusPrevInput( index ){
  //     if (index > 0) {
  //         inputs[index - 1].current.focus()
  //     }
  // }

  // Função para monitorar as mudanças nos inputs do código
  const handleCodeChange = (text, index) => {
    const newCode = [...code]; // Cria uma cópia do array de código
    newCode[index] = text; // Atualiza o valor do campo no índice específico
    setCode(newCode.join("")); // Atualiza o estado do código

    // Se todos os campos estiverem preenchidos, oculte o teclado
    if (index === numberOfInputs - 1 && text !== "") {
      Keyboard.dismiss();
    }

    // Move o foco para o próximo input se o campo atual não estiver vazio
    if (text !== "" && index < numberOfInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  async function validateRecoveryCode() {
    try {
      await api.post(
        `/RecuperarSenha/ValidateRecoveryCode?email=${route.params.emailRecuperacao}&codigo=${code}`
      );

      navigation.navigate("RedefinePassword", {
        emailRecuperacao: route.params.emailRecuperacao,
      });
    } catch (error) {
      console.log(error, email);
    }
  }

  async function resendCode() {
    try {
      await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <Close source={require('../../assets/x-top-screen.png')} /> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Verifique seu e-mail</Title>

      <EmailDescription email={route.params.emailRecuperacao} />

      <CodeInput code={code} setCode={setCode} />

      <Button
        disabled={loading}
        onPress={() => {
          indicator();
          validateRecoveryCode();
        }}
      >
        {loading ? <ActivityIndicator /> : <ButtonText>Confirmar</ButtonText>}
      </Button>

      <CodeResend onPress={() => resendCode()} text={"Reenviar Código"} />
    </Container>
  );
};
