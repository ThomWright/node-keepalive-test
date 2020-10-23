export const PORT = 8080
export const SERVER_SOCKET_TIMEOUT = 10_000

export function tsLog(
  ...msgs: Array<string | number | Error | undefined>
): void {
  // tslint:disable-next-line: no-console
  console.log(new Date().toISOString(), ...msgs)
}
