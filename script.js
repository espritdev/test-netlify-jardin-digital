
document.addEventListener("DOMContentLoaded", () => {
  const bouton = document.getElementById("test-button");
  const message = document.getElementById("message");

  if (!bouton || !message) return;

  let compteur = 0;

  bouton.addEventListener("click", () => {
    compteur++;

    message.textContent =
      `Bravo ! JavaScript fonctionne. Clic n°${compteur}`;

    bouton.textContent = "Tester encore !";
  });
});
