export default function ReservaModal({ vehiculo, onClose, onConfirm }) {
  return (
    <div className="modal show d-block fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reservar Vehículo</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Vehículo</label>
                <div className="form-control-plaintext">{vehiculo?.modelo}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de Inicio</label>
                <input type="date" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de Fin</label>
                <input type="date" className="form-control" required />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" required />
                <label className="form-check-label">
                  Acepto los términos y condiciones
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button className="btn btn-primary" onClick={onConfirm}>Confirmar reserva</button>
          </div>
        </div>
      </div>
    </div>
  );
}