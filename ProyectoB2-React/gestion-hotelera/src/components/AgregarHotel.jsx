import { useState } from "react"
import '../components/AgregarHotel.css'
import { Link } from "react-router-dom"

const API_CREATE = "http://localhost:3616/v1/hotel/"

const AgregarHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    address: "",
    category: ""
  })

  const [message, setMessage] = useState("")

  const getToken = () => localStorage.getItem("token")

  const handleChange = (e) => {
    const { name, value } = e.target
    setHotel({ ...hotel, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const token = getToken()
      const res = await fetch(API_CREATE, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hotel)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Hotel agregado correctamente.")
        setHotel({ name: "", address: "", category: "" })
      } else {
        setMessage(data.message || "Error al agregar el hotel.")
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.")
    }
  }

  const generarOpcionesEstrellas = () => {
    const opciones = []
    for (let i = 0.25; i <= 5; i += 0.25) {
      const valor = i.toFixed(2)
      opciones.push(
        <option key={valor} value={`${valor} estrellas`}>
            {valor} estrellas
        </option>
      )
    }
    return opciones
  }

  return (
    <div className="hotel-page">
      <div className="form-container">
        <form className="hotel-form" onSubmit={handleSubmit}>
          <h2>Agregar Hotel</h2>

          <input
            type="text"
            name="name"
            placeholder="Nombre del Hotel"
            value={hotel.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={hotel.address}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={hotel.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Elegir opción</option>
            {generarOpcionesEstrellas()}
          </select>

          <button type="submit">Guardar Hotel</button>

          {message && <p className="message">{message}</p>}
          <Link to="/admin">Volver</Link>
        </form>
      </div>
    </div>
  )
}

export default AgregarHotel
