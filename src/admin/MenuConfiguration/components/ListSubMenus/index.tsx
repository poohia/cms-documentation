import React, { useCallback } from "react";
import { Icon } from "semantic-ui-react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEnd,
  SortEvent,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { ListSubMenusProps, SortableItemProps } from "../../types";
import {
  DragHandleContent,
  SortableItemContent,
  SortableListContent,
} from "../../styles";

const DragHandle = SortableHandle(() => <DragHandleContent name="bars" />);
const SortableItem = SortableElement(
  ({ menu, page, removePageFromMenu }: SortableItemProps) => (
    <SortableItemContent>
      <p>
        <DragHandle />
        {page.title}
        <br />
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i>{page.slug}</i>
        </span>
      </p>
      <Icon
        link
        name="remove"
        onClick={() => removePageFromMenu(menu.id, page.id)}
      />
    </SortableItemContent>
  )
);

const SortableList = SortableContainer(
  ({ menu, ...rest }: ListSubMenusProps) => (
    <SortableListContent>
      {menu.pages.map((page, index) => (
        <SortableItem
          key={`item-${page.id}`}
          index={index}
          menu={menu}
          page={page}
          {...rest}
        />
      ))}
    </SortableListContent>
  )
);

const ListSubMenus = (props: ListSubMenusProps) => {
  const { menu, updatePagesFromMenu } = props;
  const onSortEnd = useCallback(
    (sort: SortEnd, _event: SortEvent) => {
      const { oldIndex, newIndex } = sort;
      updatePagesFromMenu(menu.id, arrayMove(menu.pages, oldIndex, newIndex));
    },
    [menu, updatePagesFromMenu]
  );

  return <SortableList {...props} onSortEnd={onSortEnd} useDragHandle />;
};

export default ListSubMenus;
