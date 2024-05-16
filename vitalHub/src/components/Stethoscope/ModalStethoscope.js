import { Modal } from "react-native";
import { TitleModal } from "../Title/StyleTitle";
import {
  ButtonLargeSelect,
  FilterButton,
  FilterButtonStet,
} from "../Button/Button";
import { LargeInputTextBox, LargeInputTextBoxStet } from "../InputBox/InputBox";
import {
  ButtonHomeContainer,
  ButtonHomeContainerStet,
} from "../Container/StyleContainer";
import {
  ContainerLabel,
  FlexButtons,
  ModalStetContent,
  StethoscopeModal,
} from "./StyleSthetoscope";
import { useState } from "react";
import { Label } from "../Label/Label";
import { CardCancelLess } from "../Descriptions/Descriptions";

export const ModalStethoscope = ({
  navigation,
  visible,
  setShowModalStethoscope,
  ...rest
}) => {
  const [selected, setSelected] = useState({
    rotina: false,
    exame: false,
    urgencia: false,
  });

  const [localizacaoP, setLocalizacaoP] = useState("");

  const [agendamento, setAgendamento] = useState(null);

  async function handleContinue() {
    await setShowModalStethoscope(false);

    navigation.replace("SelectClinic", { agendamento: agendamento });
  }

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <StethoscopeModal>
        <ModalStetContent>
          <TitleModal>Agendar Consulta</TitleModal>

          <ContainerLabel>
            <Label textLabel={"Qual o nível da consulta ?"} />
            <ButtonHomeContainerStet>
              {/* 53B330BD-4EF9-42AD-B987-0259AC3DD128 */}
              <FilterButtonStet
                onPress={() => {
                  setSelected({ rotina: true }),
                    setAgendamento({
                      ...agendamento, //Manter as informações que já existem dentro do state (agendamento)

                      prioridadeId: "C682FF2D-A8C1-4D32-8EBF-705B75D25A0D",
                      prioridadeLabel: "Rotina",
                    });
                }}
                selected={selected.rotina}
                text={"Rotina"}
              />

              {/* 6120E1C4-F1A1-445B-BDB8-81E8CBD82F29 */}
              <FilterButtonStet
                onPress={() => {
                  setSelected({ exame: true }),
                    setAgendamento({
                      ...agendamento,

                      prioridadeId: "71E0F0CC-8862-408A-B4C9-53E44FB4CE0D",
                      prioridadeLabel: "Exame",
                    });
                }}
                selected={selected.exame}
                text={"Exame"}
              />

              {/* 50A6C7FF-5720-4D41-9B36-6E1C813A4908 */}
              <FilterButtonStet
                onPress={() => {
                  setSelected({ urgencia: true }),
                    setAgendamento({
                      ...agendamento,

                      prioridadeId: "EC2C5799-4FBF-4999-AD07-8879109F61D4",
                      prioridadeLabel: "Urgência",
                    });
                }}
                selected={selected.urgencia}
                text={"Urgência"}
              />
            </ButtonHomeContainerStet>
          </ContainerLabel>

          <LargeInputTextBoxStet
            placeholderTextColor={"#34898F"}
            textLabel={"Informe a localização desejada: "}
            placeholder={"Informe a localização"}
            editable={true}
            fieldValue={agendamento ? agendamento.localizacao : null}
            onChangeText={(x) => {
              setAgendamento({
                ...agendamento,

                localizacao: x,
              }),
                setLocalizacaoP(x);
            }}
          />

          <FlexButtons>
            <ButtonLargeSelect
              onPress={() => {
                (localizacaoP != null && selected.exame == true) ||
                selected.rotina == true ||
                selected.urgencia == true
                  ? handleContinue()
                  : alert("Preencha os campos para prosseguir !!!");
              }}
              text={"Continuar"}
            />

            <CardCancelLess
              onPressCancel={() => setShowModalStethoscope(false)}
              text={"Cancelar"}
            />
          </FlexButtons>
        </ModalStetContent>
      </StethoscopeModal>
    </Modal>
  );
};
