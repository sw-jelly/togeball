import { styled } from 'styled-components'
import Header from 'src/components/app/Header'
import useStore from 'src/store'

const MainWrapper = styled.div` 
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 85%;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`

const MainLayout = ( props : MainLayoutProps ) =>{

    const { children, title } = props

    const { closeOpen, isOpen, alwaysOpen, resetAlwaysOpen } = useStore()

    const closeChat = () => {
        // console.log('hi2')
        // console.log(alwaysOpen)
        // !alwaysOpen && 
        isOpen && closeOpen() 
        // resetAlwaysOpen()
    }

    return(
    <div onClick={ closeChat } style ={{ width: '100%', height: '100%'}}>
      <Header title={ title }/>
      <MainWrapper>
            { children }
      </MainWrapper>
     </div>
    )

}
export default  MainLayout

type MainLayoutProps = {
    children?: React.ReactNode
    title?: string,
}