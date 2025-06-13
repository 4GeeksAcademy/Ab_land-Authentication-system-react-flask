import React from 'react'
import { RegisterForm } from  "../components/RegisterForm"

export const SingUp = () => {
  return (
    <div className="d-flex-center-vh better-body">
      <div className="card p-4" style={{ minWidth: '360px' }}>
        <h3 className="text-center mb-4">Create a New User </h3>
      <RegisterForm action="SingUp"/>
      </div>
    </div>
  )
}
