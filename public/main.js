let subs = null;

function notificationPermissionSet() {
    if (!window.Notification)
        return;

    const current_permission = window.Notification.permission;
    return current_permission !== "default";
}

async function getNotificationPermission() {
    if (!window.Notification)
        return false;

    const permission = await window.Notification.requestPermission()
    if (permission !== "granted")
        return false;

    new window.Notification(
        "NuveLu | Análise de Meta",
        {
            body: "Oba! Agora a ovelhinha pode te avisar sobre suas metas por aqui!",
            icon: "https://nuvelu.taniorocha.com.br/favicon.png"
        }
    );

    return true;
}

async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                "./service-worker.js",
                { scope: "./" }
            );

            console.log("Registration done");
            return registration;
        } catch (error) {
            console.error(`Registration failed with ${error}`);
            return null;
        }
    }
};

async function main() {
    const isPersmissionSet = notificationPermissionSet();
    if (!isPersmissionSet) {
        const isPermissionGranted = await getNotificationPermission();
        if (!isPermissionGranted) {
            console.log("Notification permission not granted");
            return;
        }
    }

    const permission = window.Notification.permission;
    if (permission !== "granted") {
        console.log("Notification permission not granted");
        return;
    }

    var registration = await registerServiceWorker();
    if (!registration)
        return;

    var subscription = await registration.pushManager.subscribe({
        applicationServerKey: "BA4Bu4ZmfkkJP7mCjmguRmC2uEtaHUWh04LLFoyY4pMeQdFqfogPs_m7ekO9TMKMD1ZMTKV2iWRDL4YY6lKjxK0",
        userVisibleOnly: true
    });

    subs = subscription;
}

main();

// const button_send = document.querySelector(".send");
// button_send.addEventListener("click", async () => {
//   const result = await fetch("http://192.168.50.120:3000/notify", {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(subs)
//   }).then(x => x.status === 200);
// })

// const button_active_notif = document.querySelector(".active_notifications");
// button_active_notif.addEventListener("click", async () => {
//   alert(window.Notification.permission);
//   getNotificationPermission();
// })