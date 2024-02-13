import { TagType } from 'src/types'
import { create } from 'zustand'

const useModel = create<Model>( ( set, get ) => (
  {
    selectTags: [],
    addSelectTags: (tag) => set((state) => {
      const isDuplicate = state.selectTags.some(item => item.id === tag.id);
      if (!isDuplicate && state.selectTags.length < 15) {
          return {
              selectTags: [...state.selectTags, tag]
          };
      }
      return state;
  }),
    deleteTags: ( tag ) => set(( state ) => (
      {
        selectTags: 
          state.selectTags.filter(( item ) => item.content !== tag.content )
      }
    )),
    resetTags: () => set(() =>({
      selectTags:
      []
    }
    )),
    team: 0,
    setTeam: ( data ) => set(() => ({ team: data })),
    stadiums: [],
    addStadiums: (stadium) => set((state) => {
      const isDuplicate = state.stadiums.some(item => item.id === stadium.id);
      if ( !isDuplicate ) {
          return {
              stadiums: [...state.stadiums, stadium]
          };
      }
      return state;
  }),
    deleteStadiums: ( stadium ) => set(( state ) => (
      {
        stadiums: 
          state.stadiums.filter(( item ) => item !== stadium )
      }
    )),
    image: '',
    setImage: ( data ) => set(() => ({ image: data }) )
  }
))

export default useModel

export interface Model{
  selectTags : TagType[]
  addSelectTags : ( tag: TagType ) => void
  deleteTags : ( tag: TagType ) => void
  resetTags : () => void
  team: number
  setTeam: ( data: number ) => void
  stadiums: TagType[]
  addStadiums: ( stadium: TagType ) => void
  deleteStadiums: ( stadium: TagType ) => void
  image: string
  setImage: ( data ) => void
}