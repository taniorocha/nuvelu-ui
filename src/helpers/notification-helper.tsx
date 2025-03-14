export function getNotificationPermissionStatus() {
    if (!Notification)
        return null;

    return Notification.permission;
}

export async function requestNotificationPermission() {
    if (!Notification)
        return false;

    const permission = await Notification.requestPermission();
    if (permission !== "granted")
        return false;

    new Notification(
        "NuveLu | Análise de Meta",
        {
            body: "Oba! Agora a ovelhinha pode te avisar sobre suas metas por aqui!",
            icon: "https://nuvelu.taniorocha.com.br/favicon.png"
        }
    );

    return true;
}

export async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                "./service-worker.js",
                { scope: "./" }
            );

            console.log("Service worker registration done");
            return registration;
        } catch (error) {
            console.error(`Registration failed with ${error}`);
            return null;
        }
    }
};