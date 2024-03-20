import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// importar recursos do expo-notification
import * as Notifications from "expo-notifications";

// solicita permissões de notificação ao iniciar o app
Notifications.requestPermissionsAsync();
Notifications.setNotificationHandler({
  // define como as notificações devem ser tratadas quando recebidas
  handleNotification: async () => ({
    shouldShowAlert: true, // Mostra um alerta no dispositivo quando a notificação for recebida
    shouldPlaySound: true, // Toca um som quando a notificação for recebida
    shouldSetBadge: false, // Define se deve ou não mostrar um badge na barra de tarefas com a quantidade de notificações pendentes
  }),
});

export const handleCallNotification = async ({
  title,
  body,
  sound = "default",
  vibrate = [0, 250, 250, 250],
  trigger = null,
}) => {
  // obtem o status da permissão
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    alert("Você não deixou as notificações ativas");
    return;
  }

  //Agenda uma notificação
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: sound,
      vibrate: vibrate, // Adiciona uma vibração à notificação
    },
    trigger: trigger, // dispara imediatamente
  });
};
