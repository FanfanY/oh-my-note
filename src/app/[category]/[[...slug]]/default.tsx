'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const Default = () => {
  const a = useParams()
  return <div>{JSON.stringify(a)}</div>
}

export default Default
