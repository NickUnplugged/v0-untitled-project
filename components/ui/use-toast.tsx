type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast(props: ToastProps) {
  // In a real implementation, this would use a context provider
  // For simplicity, we're just showing an alert
  alert(`${props.title}: ${props.description}`)
}
