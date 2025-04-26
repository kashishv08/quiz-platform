function addQuestion() {
  const container = document.getElementById("questions-container");
  const index = container.children.length;

  const questionHTML = `
    <div class="question-block">
      <label>Question:</label>
      <input type="text" name="questions[${index}][questionText]" required>
      
      <label>Options:</label>
      <input type="text" name="questions[${index}][options][]" required>
      <input type="text" name="questions[${index}][options][]" required>
      <input type="text" name="questions[${index}][options][]" required>
      <input type="text" name="questions[${index}][options][]" required>
      
      <label>Correct Answer Index (0-3):</label>
      <input type="number" min="0" max="3" name="questions[${index}][correctAnswerIndex]" required>
      <hr>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", questionHTML);
}
