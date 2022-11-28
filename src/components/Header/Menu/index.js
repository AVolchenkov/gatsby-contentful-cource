import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { MenuWrapper, MenuItem, SubMenuItemWrapper, MenuContainer } from "./style"

const Menu = () => {
  const result = useStaticQuery(graphql `
    fragment menuItemData on ContentfulMenuItem {
      id
      label
      page {
        ... on ContentfulPage {
          slug
        }
        ... on ContentfulBlog {
          slug
        }
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
    <MenuContainer>
      <MenuItem style={{margin: 0, padding: 0}}>
        <Link style={{textDecoration: 'none'}} to="/"><h2>HOME</h2></Link>
      </MenuItem>
      <MenuWrapper>
        {result.contentfulMenu.menuItems.map(menuItem => (
          <MenuItem key={menuItem.id}>
            {!menuItem.subMenuItems ? 
              <Link to={`/${menuItem.page.slug}`}>{menuItem.label}</Link> :
              (<SubMenuItemWrapper>
                <div>{menuItem.label}</div>
                <div>
                  {menuItem.subMenuItems?.map(subMenuItem => (
                    <div key={subMenuItem.id}>
                    <Link to={`/${subMenuItem.page.slug}`}>{subMenuItem.label}</Link>
                    </div>
                  ))}
                </div>
              </SubMenuItemWrapper>)}
          </MenuItem>
        ))}
        <MenuItem>
          <Link to="/contact">Contact</Link>
        </MenuItem>
      </MenuWrapper>
    </MenuContainer>
  )
}

export default Menu;