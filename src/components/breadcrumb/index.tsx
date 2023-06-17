'use client'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface BreadcrumbProps {
  items: Array<string>
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <AntBreadcrumb
      separator={
        <div className="h-full w-full flex items-center">
          <MdOutlineKeyboardArrowRight />
        </div>
      }
      items={items.map((text) => ({ title: text }))}
    />
  )
}

export default Breadcrumb
