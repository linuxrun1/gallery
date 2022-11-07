const modalView = document.getElementById('modalView')
const modalEdit = document.getElementById('modalEdit')

modalView.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = modalView.querySelector('.modal-title')
  const modalBodyInput = modalView.querySelector('.modal-body input')

  modalTitle.textContent = `View to ${recipient}`
  modalBodyInput.value = recipient
})

modalEdit.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = modalEdit.querySelector('.modal-title')
  const modalBodyInput = modalEdit.querySelector('.modal-body input')

  modalTitle.textContent = `Edit to ${recipient}`
  modalBodyInput.value = recipient
})

