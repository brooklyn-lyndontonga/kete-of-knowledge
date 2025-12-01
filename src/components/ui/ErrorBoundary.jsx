/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center text-gray-500">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p>Please refresh the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
