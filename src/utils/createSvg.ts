export const createSvg = (svg: string, classes?: string) => {
  const svgElement = new DOMParser()
    .parseFromString(
      atob(svg.replace(/data:image\/svg\+xml;base64,/, '')),
      'image/svg+xml'
    )
    .querySelector('svg')

  if (classes) {
    svgElement.classList.add(classes)
  }
  return svgElement
}
