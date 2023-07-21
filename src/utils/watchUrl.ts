type NavigateEvent = {
  destination: {
    url: string
  }
}
type Options = {
  url: string
}
export const watchUrl = (callback: (options: Options) => void) => {
  let url = window.location.href
  callback({ url })
  //@ts-ignore
  navigation.addEventListener('navigate', (e: NavigateEvent) => {
    if (url !== e.destination.url) {
      url = e.destination.url
      callback({ url })
    }
  })
}
