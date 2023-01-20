export function setDocumentCookie(
  cName: string,
  cValue: string,
  expDays: number = 90,
) {
  let date = new Date()
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${cName}=${cValue}; ${expires}; path=/; SameSite=Lax`
}

export function getIsDocumentCookieSet(cName: string) {
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith(`${cName}=`))
}

export function deleteDocumentCookie(cName: string) {
  document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
