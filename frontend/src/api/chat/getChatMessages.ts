import { getAxios } from 'src/api/util'

interface dataType {
  userId: string;
  page: number;
  size: number;
}

export const getChatMessages = async( id, data : dataType ) => {
  try{
    console.log(data)
    console.log(id)
    const response = await getAxios(`chat-server/chats/${ id }`, data ) 
    return response
  } catch( err ){
    console.log(err)
  }
}