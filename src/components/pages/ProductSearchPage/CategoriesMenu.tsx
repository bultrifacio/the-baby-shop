import React from "react";
import {Category} from "../../../shared/model/Category";
import {Drawer, Menu} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import difference from 'lodash/difference';

interface CategoriesListProps {
    categories: Array<Category> | undefined;
    onSelectCategory: Function;
    visibleMenu: boolean;
    onClickDrawerMenu: Function;
}

export const CategoriesMenu: React.FunctionComponent<CategoriesListProps> = props => {

    const [openedSubMenu, setOpenedSubMenu] = React.useState<Array<string>>([]);

    const onOpenChange = (openKeys: Array<string>): void => {
        setOpenedSubMenu(difference(openKeys, openedSubMenu));
    };

    return (
        <div className="categories-menu">
            <div className="inline-menu-container">
                <Menu mode="inline"
                      openKeys={openedSubMenu}
                      onOpenChange={onOpenChange}
                      className="inline-menu"
                      onSelect={({key}) => props.onSelectCategory(key)}>
                    {props.categories?.map((category: Category) =>
                        <SubMenu key={category.categoryId} title={<span>{category.name}</span>}>
                            {category.children.map((subCategory: Category) =>
                                <Menu.Item key={subCategory.categoryId}>{subCategory.name}</Menu.Item>)}
                        </SubMenu>
                    )}
                </Menu>
                {props.children}
            </div>
            <div className="collapsable-menu-container">
                <Drawer
                    title="Categories"
                    placement="left"
                    closable
                    onClose={() => props.onClickDrawerMenu(false)}
                    visible={props.visibleMenu}
                >
                    <Menu mode="inline"
                          openKeys={openedSubMenu}
                          onOpenChange={onOpenChange}
                          className="collapsable-menu"
                          onSelect={({key}) => props.onSelectCategory(key)}>
                        {props.categories?.map((category: Category) =>
                            <SubMenu key={category.categoryId} title={<span>{category.name}</span>}>
                                {category.children.map((subCategory: Category) =>
                                    <Menu.Item key={subCategory.categoryId}>{subCategory.name}</Menu.Item>)}
                            </SubMenu>
                        )}
                    </Menu>
                    {props.children}
                </Drawer>
            </div>
        </div>
    );
};