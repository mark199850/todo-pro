import { todos, type Todo } from './db'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    await delay(500) // Simulate network delay
    return [...todos]
  },

  async getTodosByDate(date: string): Promise<Todo[]> {
    await delay(500)
    return todos.filter((todo) => todo.date === date)
  },

  async addTodo(description: string, date: string): Promise<Todo> {
    await delay(500)
    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      description,
      date,
      completed: false,
    }
    todos.push(newTodo)
    return newTodo
  },

  async deleteTodo(id: string): Promise<boolean> {
    await delay(500)
    const index = todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
      return true
    }
    return false
  },

  async updateTodo(updatedTodo: Todo): Promise<Todo | null> {
    await delay(500)
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      todos[index] = { ...updatedTodo }
      return todos[index]
    }
    return null
  },

  async toggleComplete(id: Todo['id']): Promise<Todo | null> {
    await delay(500)
    const index = todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos[index].completed = !todos[index].completed
      return todos[index]
    }
    return null
  },
}
