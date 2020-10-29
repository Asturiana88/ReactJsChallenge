import React from 'react'
import { Modal } from 'react-bootstrap'
import { itemInterface } from './Content'

interface Props {
  show: Boolean,
  handleClose: (entity: itemInterface) => void,
  selectedEntity: itemInterface
}

const Entity = ({ show, handleClose, selectedEntity }: Props) => {
  if (show && !selectedEntity.name) {
    return <>Loading...</>
  }

  const handleBody = () => {
    if (selectedEntity.image) {
      return (
        <Modal.Body>
          <img width="100%" src={selectedEntity.image} alt={selectedEntity.name} />
          <Modal.Title className="titleModal">
            {selectedEntity.name}
          </Modal.Title>
          <table>
            <tbody>
              <tr>
                <td>Type:</td>
                <td>
                  <strong>
                    {selectedEntity.type || " - "}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td><strong>{selectedEntity.gender}</strong></td>
              </tr>
              <tr>
                <td>Species:</td>
                <td><strong>{selectedEntity.species}</strong></td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      )
    } else if (selectedEntity.dimension) {
      return (
        <Modal.Body>
          <Modal.Title className="titleModal">
            {selectedEntity.name}
          </Modal.Title>
          <p><strong><u>Type:</u></strong>{` ${selectedEntity.type}`}</p>
          <p><strong><u>Dimension:</u></strong>{` ${selectedEntity.dimension}`}</p>
          <p><u><strong>Residents: </strong></u></p>
          <div className="row">
            {selectedEntity.residents && selectedEntity.residents.map((entity: itemInterface, i: number) => {
              if (i < 5) {
                if (entity.name === null) { return <strong className="noData">No Residents</strong> }
                return (
                  <div key={entity.id} className="col-5 col-md-3 titleModal contentItem">
                    <img width="100%" src={entity.image} alt={entity.name} /> <br />
                    <strong>{` ${entity.name}`}</strong>
                  </div>
                )
              }
              return null
            })}
          </div>
        </Modal.Body>
      )
    }
    return (
      <Modal.Body>
        <Modal.Title className="titleModal">
          {selectedEntity.name}
        </Modal.Title>
        <p><strong><u>Release Date:</u></strong>{` ${selectedEntity.air_date}`}</p>
        <p><strong><u>Episode:</u></strong>{` ${selectedEntity.episode}`}</p>
        <p><u><strong>Characters: </strong></u></p>
        <div className="row">
          {selectedEntity.characters && selectedEntity.characters.map((entity: itemInterface, i: number) => {
            if (i < 5) {
              return (
                <div key={entity.id} className="col-5 col-md-3 titleModal contentItem">
                  <img width="100%" src={entity.image} alt={entity.name} /> <br />
                  <strong>{` ${entity.name}`}</strong>
                </div>
              )
            }
            return null
          }
          )
          }
        </div>
      </Modal.Body>
    )
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <div className="d-flex justify-content-end">
        <button onClick={handleClose} className="close closeBtn">X</button>
      </div>
      {handleBody()}
    </Modal>
  )
}


export default Entity;