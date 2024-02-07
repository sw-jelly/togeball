import { Title } from 'src/components'
import { TagList } from './index'
import styled from 'styled-components'

const ColTagListWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`

const ColTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  font-weight: bold;
  margin-bottom: 10px;
`

const ColTagList = ( props : RowTagListProp ) => {

  const { children, list } = props
  // console.log(list)

  return(
  <ColTagListWrapper>
    <ColTitleWrapper>
      <Title type='small'>{ children }</Title>
    </ColTitleWrapper>
    <TagList tags = { list }/>
  </ColTagListWrapper>
  )
}

export default ColTagList

interface dataSource  {
  id?: number,
  content?: string,
  type?: string,
  isSelect?: boolean
}

type RowTagListProp = {
  children?: Array<string | any> | string,
  list?: dataSource[]
}