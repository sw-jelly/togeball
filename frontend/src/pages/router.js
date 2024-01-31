import { useRouter } from '../hooks'

export const routes = [
    
    { path: 'login' },
    { path: 'dev' },
    { path: 'home' },
    { path: 'recruit/post' },
    { path: 'recruit' },
    { path: 'signup' },
    { path: 'profile' },
    { path: 'todaygames' },
    { path: 'boards' },
    
    { path: 'calender' },
    { path: 'calender/week'},
    { path: 'mypage'},

    { path: 'chat', dynamicPath: 'chat/:chatroomId' },

]

const lazyModules = routes.map( ( { path, dynamicPath } ) => useRouter( path, dynamicPath ) )

lazyModules.unshift( {
    path: '/',
    lazy: async () => {
        const module = await import( `./home` )
        return {
            Component: module.default
        }
    }
} )

export default lazyModules