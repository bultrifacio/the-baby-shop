import React from "react";
import {Category} from "../../../shared/model/Category";
import {Menu} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import difference from 'lodash/difference';

interface CategoriesListProps {
    categories: Array<Category>
    onSelectCategory: Function;
}

export const CategoriesMenu: React.FunctionComponent<CategoriesListProps> = props => {

    const [openedSubMenu, setOpenedSubMenu] = React.useState<Array<string>>([]);

    const onOpenChange = (openKeys: Array<string>) => {
        setOpenedSubMenu(difference(openKeys, openedSubMenu));
    };

    return (
        <Menu mode="inline"
              openKeys={openedSubMenu}
              className="categories-menu"
              onOpenChange={onOpenChange}
              onSelect={({key}) => props.onSelectCategory(key)}>
            {props.categories.map((category: Category) =>
                <SubMenu key={category.categoryId} title={<span>{category.name}</span>}>
                    {category.children.map((subCategory: Category) =>
                        <Menu.Item key={subCategory.categoryId}>{subCategory.name}</Menu.Item>)}
                </SubMenu>
            )}
        </Menu>
    );
};