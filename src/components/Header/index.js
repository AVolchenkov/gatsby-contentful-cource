import React from "react";
import { HeaderWrapper, HeaderInner } from "./style";
import Menu from './Menu/index'

export default function Header () {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Menu/>
      </HeaderInner>
    </HeaderWrapper>
  )
} 