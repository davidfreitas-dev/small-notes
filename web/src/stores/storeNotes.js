import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return { 
            notes: [],
            selectedNoteId: ''
        }
    },
    actions: {
        getLocalNotes() {
            const json = localStorage.getItem('notes')
            const array = JSON.parse(json) || []
            this.notes = Array.isArray(array) ? array : []
        },
        setLocalNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes))
        },
        selectNote(id) {
            this.selectedNoteId = id
        },
        addNote(color) {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0')
            const months = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            const month = date.getMonth()

            const note = {
                id: uuidv4(),
                content: '',
                color: color,
                dtRegister: `${day} de ${months[month]}`
            }

            this.notes.unshift(note)
        },
        deleteNote(id) {
            const i = this.notes.findIndex(note => note.id === id)
            
            this.notes.splice(i, 1)
            this.selectedNoteId = ''
        }
    },
})