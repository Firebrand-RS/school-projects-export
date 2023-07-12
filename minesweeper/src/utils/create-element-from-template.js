export function createElementFromTemplate(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
}
