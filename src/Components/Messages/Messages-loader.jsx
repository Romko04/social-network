import React from "react"
import ContentLoader from "react-content-loader"

const MessagesLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={806}
    height={100}
    viewBox="0 0 806 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="235" rx="0" ry="0" width="260" height="25" /> 
    <rect x="1" y="275" rx="10" ry="10" width="260" height="100" /> 
    <rect x="9" y="406" rx="0" ry="0" width="82" height="26" /> 
    <rect x="110" y="394" rx="30" ry="30" width="150" height="45" /> 
    <circle cx="30" cy="30" r="30" /> 
    <rect x="64" y="16" rx="0" ry="0" width="465" height="24" /> 
    <rect x="23" y="76" rx="0" ry="0" width="320" height="22" />
  </ContentLoader>
)

export default MessagesLoader