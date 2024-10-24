document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('user-list');

    // Загрузка пользователей при старте
    loadUsers();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = {
            name: nameInput.value,
            email: emailInput.value
        };

        await window.api.addUser(user); // Добавляем пользователя
        nameInput.value = '';
        emailInput.value = '';
        loadUsers(); // Перезагружаем список пользователей
    });

    async function loadUsers() {
        const users = await window.api.getUsers();
        userList.innerHTML = '';
        users.forEach((user) => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    }
});
