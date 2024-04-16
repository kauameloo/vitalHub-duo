import { Modal } from "react-native";
import { ButtonLargeSelect } from "../Button/Button";
import {
  ModalContent,
  PatientModal,
} from "../CancellationModal/StyleCancelationModal";
import { CardCancelLess } from "../Descriptions/Descriptions";
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions";
import { ImageModalRecord } from "../Images/StyleImages";
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle";
import { BoxAgeEmailModal } from "./StyleAppointmentModal";
import { useEffect } from "react";
import moment from "moment";

export const AppointmentModal = ({
  consulta,
  navigation,
  visible,
  setShowModalAppointment = null,
  ...rest
}) => {
  useEffect(() => {
    console.log(consulta);
  });
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        <ModalContent>
          <ImageModalRecord
            source={require("../../assets/ImageModalRecord.png")}
          />

          <TitleModalRecord>
            {consulta && consulta.paciente && consulta.paciente.idNavigation
              ? consulta.paciente.idNavigation.nome
              : "Nome não disponível"}
          </TitleModalRecord>

          <BoxAgeEmailModal>
            <DescriptionModalRecord>
              {" "}
              {consulta && consulta.paciente && consulta.paciente.dataNascimento
                ? `${
                    moment().year() -
                    moment(consulta.paciente.dataNascimento).format("YYYY")
                  } anos`
                : "Idade não disponível"}
            </DescriptionModalRecord>
            <DescriptionModalRecord>
              {consulta && consulta.paciente && consulta.paciente.idNavigation
                ? consulta.paciente.idNavigation.email
                : "Email não disponível"}
            </DescriptionModalRecord>
          </BoxAgeEmailModal>

          <ButtonLargeSelect
            onPress={() => {
              navigation.navigate("MedicalRecords"), { consulta: consulta };
            }}
            text={"Inserir Prontuário"}
          />

          <CardCancelLess
            onPressCancel={() => setShowModalAppointment(false)}
            text={"Cancelar"}
          />
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
