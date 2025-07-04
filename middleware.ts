import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isAuth = !!token
  const isLogin = pathname === '/login'

  if (!isAuth && pathname.startsWith('/painel')) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  if (isAuth && isLogin) {
    const painelUrl = request.nextUrl.clone()
    painelUrl.pathname = '/painel'
    return NextResponse.redirect(painelUrl)
  }

  return NextResponse.next()
}
