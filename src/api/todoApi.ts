import { todos, type Todo } from './db'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    await delay(300) // Simulate network delay
    return [...todos]
  },

  async getTodosByDate(date: string): Promise<Todo[]> {
    await delay(300)
    return todos.filter((todo) => todo.date === date)
  },

  async addTodo(description: string, date: string): Promise<Todo> {
    await delay(300)
    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      description,
      date,
    }
    todos.push(newTodo)
    return newTodo
  },

  async deleteTodo(id: string): Promise<boolean> {
    await delay(300)
    const index = todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
      return true
    }
    return false
  },

  async updateTodo(updatedTodo: Todo): Promise<Todo | null> {
    await delay(300)
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      todos[index] = { ...updatedTodo }
      return todos[index]
    }
    return null
  },
}
