import React from 'react';
import { Category } from '../../../shared/model/Category';
import { Drawer, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import difference from 'lodash/difference';
import { useIntl } from 'react-intl';

interface CategoriesListProps {
    categories: Array<Category> | undefined;
    onSelectCategory: Function;
    visibleMenu: boolean;
    onClickDrawerMenu: Function;
}

export const FilterMenu: React.FunctionComponent<CategoriesListProps> = (props) => {
    const [openedSubMenu, setOpenedSubMenu] = React.useState<Array<string>>([]);

    const { categories, onSelectCategory, visibleMenu, onClickDrawerMenu, children } = props;

    const onOpenChange = (openKeys: Array<string>): void => {
        setOpenedSubMenu(difference(openKeys, openedSubMenu));
    };

    const intl = useIntl();

    const CategoriesMenu: React.FunctionComponent = () => {
        return (
            <Menu
                mode="inline"
                openKeys={openedSubMenu}
                onOpenChange={onOpenChange}
                className="inline-menu"
                onSelect={({ key }) => onSelectCategory(key)}
            >
                {categories?.map((category: Category) => (
                    <SubMenu key={category.categoryId} title={<span>{category.name}</span>}>
                        {category.children.map((subCategory: Category) => (
                            <Menu.Item key={subCategory.categoryId}>{subCategory.name}</Menu.Item>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
        );
    };

    const MenuAndFilter: React.FunctionComponent = () => {
        return (
            <React.Fragment>
                <CategoriesMenu />
                {children}
            </React.Fragment>
        );
    };

    const MobileMenu: React.FunctionComponent = () => {
        return (
            <Drawer
                title={intl.formatMessage({ id: 'filter.menu.title' })}
                placement="left"
                closable
                onClose={() => onClickDrawerMenu(false)}
                visible={visibleMenu}
            >
                <MenuAndFilter />
            </Drawer>
        );
    };

    return (
        <div className="categories-menu">
            <div className="inline-menu-container">
                <MenuAndFilter />
            </div>
            <div className="collapsable-menu-container">
                <MobileMenu />
            </div>
        </div>
    );
};
