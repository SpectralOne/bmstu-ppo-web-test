import React, { useState } from 'react'
import { ButtonSecondary, TableDeleteButton, TableDeleteConfirmButton, Flex } from '../theme'

interface DeleteConfirmationProps {
  onDelete: () => void
}
const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onDelete,
}) => {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  return (
    <Flex justifyContent="flex-end">
      {confirming ? (
        <>
          <TableDeleteConfirmButton
            disabled={deleting}
            onClick={() => {
              setDeleting(true)
              onDelete()
            }}
            className="confirm-delete-button"
          >
            Yes, delete.
          </TableDeleteConfirmButton>
          <TableDeleteButton disabled={deleting} onClick={() => setConfirming(false)}>
            Cancel
          </TableDeleteButton>
        </>
      ) : (
        <ButtonSecondary className="delete-button" onClick={() => setConfirming(true)}>Delete</ButtonSecondary>
      )}
    </Flex>
  )
}

export default DeleteConfirmation

