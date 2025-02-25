import React from 'react'
import AllPostTab from './AllPostTab'
import StatusPostsTab from './StatusPostsTab'

export default function TabContainer({tab}:{tab:string}) {
  return (
    <>
      {(tab === 'all-post' ) && (<AllPostTab />)}                
      {(tab === 'active-post' ) && (<StatusPostsTab status="active" />)}               
      {(tab === 'inactive-post' ) && (<StatusPostsTab status="inactive" />)}
    </>
  )
}
