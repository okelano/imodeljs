/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import * as React from "react";

import { SizeProps } from "@bentley/ui-core";

import { ActionButtonItemDef } from "./ActionButtonItemDef";
import { CustomItemProps } from "./CustomItemProps";

/** @internal */
interface CloneProps {
  key: string;
  onSizeKnown: (size: SizeProps) => void;
}

/** An Item that renders a React component.
 * @beta
 */
export class CustomItemDef extends ActionButtonItemDef {
  private static _sId = 0;
  public static customIdPrefix = "Custom-";
  public customId: string;
  public reactElement: React.ReactNode;

  constructor(props: CustomItemProps) {
    super(props);

    if (props.customId)
      this.customId = props.customId;
    else {
      CustomItemDef._sId++;
      this.customId = CustomItemDef.customIdPrefix + CustomItemDef._sId;
    }

    this.reactElement = props.reactElement;
  }

  public get id(): string {
    return this.customId;
  }

  public toolbarReactNode(index?: number): React.ReactNode {
    if (!this.isVisible)
      return null;

    let clone: React.ReactNode;

    // istanbul ignore else
    if (React.isValidElement(this.reactElement)) {
      const key = this.getKey(index);
      const cloneProps: CloneProps = {
        key,
        onSizeKnown: this.handleSizeKnown,
      };

      clone = React.cloneElement(this.reactElement, cloneProps);
    }

    return clone;
  }

}
