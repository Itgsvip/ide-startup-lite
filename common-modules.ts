import { MainLayoutModule } from '@ali/ide-main-layout/lib/browser';
import { LogModule } from '@ali/ide-logs/lib/browser';
import { MonacoModule } from '@ali/ide-monaco/lib/browser';
import { EditorModule } from '@ali/ide-editor/lib/browser';
import { StatusBarModule } from '@ali/ide-status-bar/lib/browser';
import { ClientCommonModule, BrowserModule } from '@ali/ide-core-browser';
import { QuickOpenModule } from '@ali/ide-quick-open/lib/browser';
import { ConstructorOf } from '@ali/ide-core-common';
import { FileTreeNextModule } from '@ali/ide-file-tree-next/lib/browser';
import { FileServiceClientModule } from '@ali/ide-file-service/lib/browser';
import { ThemeModule } from '@ali/ide-theme/lib/browser';
import { WorkspaceModule } from '@ali/ide-workspace/lib/browser';
import { ExtensionStorageModule } from '@ali/ide-extension-storage/lib/browser';
import { StorageModule } from '@ali/ide-storage/lib/browser';
import { OpenedEditorModule } from '@ali/ide-opened-editor/lib/browser';
import { ExplorerModule } from '@ali/ide-explorer/lib/browser';
import { DecorationModule } from '@ali/ide-decoration/lib/browser';
import { PreferencesModule } from '@ali/ide-preferences/lib/browser';
import { MenuBarModule } from '@ali/ide-menu-bar/lib/browser';
import { OverlayModule } from '@ali/ide-overlay/lib/browser';
import { StaticResourceModule } from '@ali/ide-static-resource/lib/browser';
import { WorkspaceEditModule } from '@ali/ide-workspace-edit/lib/browser';
import { KeymapsModule } from '@ali/ide-keymaps/lib/browser';
import { KaitianExtensionModule } from '@ali/ide-kaitian-extension/lib/browser';
import { CommentsModule } from '@ali/ide-comments/lib/browser';
import { WebviewModule } from '@ali/ide-webview/lib/browser';
import { OutputModule } from '@ali/ide-output/lib/browser';
import { OutlineModule } from '@ali/ide-outline/lib/browser';

import { BrowserFileSchemeModule } from './web-lite/overrides/browser-file-scheme';

export const CommonBrowserModules: ConstructorOf<BrowserModule>[] = [
  FileServiceClientModule,
  MainLayoutModule,
  OverlayModule,
  LogModule,
  ClientCommonModule,
  StatusBarModule,
  MenuBarModule,
  MonacoModule,
  ExplorerModule,
  EditorModule,
  QuickOpenModule,
  KeymapsModule,
  FileTreeNextModule,
  ThemeModule,
  WorkspaceModule,
  ExtensionStorageModule,
  StorageModule,
  PreferencesModule,
  OpenedEditorModule,
  DecorationModule,
  StaticResourceModule,
  WorkspaceEditModule,
  CommentsModule,
  WebviewModule,
  OutputModule,
  OutlineModule,
  // browser custom modules
  BrowserFileSchemeModule,
  KaitianExtensionModule,
];
