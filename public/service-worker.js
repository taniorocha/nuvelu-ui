self.addEventListener("push", async (event) => {
    const { title, body, icon } = await event.data.json();

    self.registration.showNotification(
        title, { body, icon }
    );
});