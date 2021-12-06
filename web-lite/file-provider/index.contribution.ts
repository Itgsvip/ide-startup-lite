import { Autowired } from '@opensumi/di';
import {
  Domain,
  URI,
  FsProviderContribution,
  AppConfig,
  Uri,
} from '@opensumi/ide-core-browser';
import { Path } from '@opensumi/ide-core-common/lib/path';
import { BrowserFsProvider, AbstractHttpFileService } from './browser-fs-provider';
import { IFileServiceClient } from '@opensumi/ide-file-service';
import { FileServiceClient } from '@opensumi/ide-file-service/lib/browser/file-service-client';
import { StaticResourceContribution, StaticResourceService } from '@opensumi/ide-static-resource/lib/browser/static.definition';
import { IWorkspaceService } from '@opensumi/ide-workspace';

import { KaitianExtFsProvider } from './ext-fs-provider';
import { HttpFileService } from './http-file.service';

const EXPRESS_SERVER_PATH = window.location.href;

// file 文件资源 远程读取
@Domain(StaticResourceContribution, FsProviderContribution)
export class FileProviderContribution implements StaticResourceContribution, FsProviderContribution {

  @Autowired(IFileServiceClient)
  private readonly fileSystem: FileServiceClient;

  @Autowired(AbstractHttpFileService)
  private httpImpl: HttpFileService;

  @Autowired(AppConfig)
  private readonly appConfig: AppConfig;

  @Autowired(IWorkspaceService)
  private readonly workspaceService: IWorkspaceService;

  @Autowired()
  private readonly ktExtFsProvider: KaitianExtFsProvider;

  onFileServiceReady() {
    this.httpImpl.initWorkspace(Uri.file(this.appConfig.workspaceDir!));
  }

  registerProvider(registry: IFileServiceClient) {
    registry.registerProvider('kt-ext', this.ktExtFsProvider);
  }

  registerStaticResolver(service: StaticResourceService): void {
    // 用来打开 raw 文件，如 jpg
    service.registerStaticResourceProvider({
      scheme: 'file',
      resolveStaticResource: (uri: URI) => {
        // file 协议统一走 scm raw 服务
        // https://127.0.0.1:8080/asset-service/v3/project/$repo/repository/blobs/$ref
        // GET /api/v3/projects/{id}/repository/blobs/{sha}
        const assetsUri = new URI(this.appConfig.staticServicePath || EXPRESS_SERVER_PATH);
        const rootUri = new URI(this.workspaceService.workspace?.uri!);
        const relativePath = rootUri.relative(uri);
        return assetsUri
          .withPath(
            new Path('asset-service/v3/projects')
            .join(
              'repository/blobs',
            ),
          )
          .withQuery(`filepath=${relativePath?.toString()}`);
      },
      roots: [this.appConfig.staticServicePath || EXPRESS_SERVER_PATH],
    });
    // 插件静态资源路径
    service.registerStaticResourceProvider({
      scheme: 'kt-ext',
      resolveStaticResource: (uri: URI) => {
        // kt-ext 协议统一走 scheme 头转换为 https
        return uri.withScheme('https');
      },
      roots: [this.appConfig.staticServicePath || EXPRESS_SERVER_PATH],
    });
  }
}
