import React from "react";
import { graphql, useStaticQuery } from "gatsby";

export default function Header () {
  const result = useStaticQuery(graphql `
    fragment menuItemData on ContentfulMenuItem {
      id
      label
      page {
        slug
      }
    }
    
    query MyQuery {
      contentfulMenu {
        menuItems {
          ...menuItemData
          subMenuItems {
            ...menuItemData
          }
        }
      }
    }
  `)
  return (
    <div>
      {result.contentfulMenu.menuItems.map(menuItem => (
        <div key={menuItem.id}>
          <div>{menuItem.label}</div>
          {menuItem.subMenuItems?.map(subMenuItem => (
            <div key={subMenuItem.id}>{subMenuItem.label}</div>
        ))}
        </div>
      ))}
    </div>
  )
} 