import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http_server/http_server.dart';
import 'package:window_manager/window_manager.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:developer';


Future<void> copyAssetFolder(String assetFolderPath, String targetDirPath) async {
  final manifestContent = await rootBundle.loadString('AssetManifest.json');
  final Map<String, dynamic> manifestMap = json.decode(manifestContent);

  for (final assetPath in manifestMap.keys) {
    if (assetPath.startsWith(assetFolderPath)) {
      final data = await rootBundle.load(assetPath);
      final bytes = data.buffer.asUint8List();
      final filename = assetPath.replaceFirst(assetFolderPath, '');
      final file = File('$targetDirPath$filename');
      await file.create(recursive: true);
      await file.writeAsBytes(bytes);
    }
  }
}


void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if(Platform.isWindows) {
    await windowManager.ensureInitialized();
    await windowManager.setResizable(false);
    await windowManager.setSize(Size(1080, 720));
    await windowManager.setFullScreen(true);
    await windowManager.setTitleBarStyle(TitleBarStyle.hidden);
    final exeDir = File(Platform.resolvedExecutable).parent.path;
    await windowManager.setIcon('$exeDir/icon.ico');
    await windowManager.setTitle('Resume Builder by Md. Jibon Howlader');
    await windowManager.setAsFrameless();
  }

  if(Platform.isWindows){
    final exeDir = File(Platform.resolvedExecutable).parent.path;
    final staticFiles = VirtualDirectory('$exeDir/data/flutter_assets/assets/dist/')..allowDirectoryListing = true;
    HttpServer.bind(InternetAddress.loopbackIPv4, 1059).then((server) {
      server.listen((HttpRequest request) {
        staticFiles.serveRequest(request);
      });
    });
  }
  if (Platform.isAndroid) {
    final cacheDir = await getTemporaryDirectory();
    final distPath = '${cacheDir.path}/dist/';

    await copyAssetFolder('assets/dist/', distPath);

    final staticFiles = VirtualDirectory(distPath)..allowDirectoryListing = true;
    HttpServer.bind(InternetAddress.loopbackIPv4, 1059).then((server) {
      server.listen((HttpRequest request) {
        staticFiles.serveRequest(request);
      });
    });
  }




  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WebViewLocalPage(),
    );
  }
}

class WebViewLocalPage extends StatefulWidget {
  const WebViewLocalPage({super.key});

  @override
  State<WebViewLocalPage> createState() => _WebViewLocalPageState();
}

class _WebViewLocalPageState extends State<WebViewLocalPage> {
  late InAppWebViewController webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Resume Builder by Md. Jibon Howlader"),
        actions: [
          IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () async {
              if (await webViewController.canGoBack()) {
                await webViewController.goBack();
              }
            },
          ),
          IconButton(
            icon: const Icon(Icons.arrow_forward),
            onPressed: () async {
              if (await webViewController.canGoForward()) {
                await webViewController.goForward();
              }
            },
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () async {
              await webViewController.reload();
            },
          ),
          IconButton(
            icon: const Icon(Icons.home),
            onPressed: () async {
              await webViewController.loadUrl(
                urlRequest: URLRequest(
                  url: WebUri("http://localhost:1059/index.html"),
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.minimize),
            onPressed: () async {
              await windowManager.blur();
            },
          ),
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () async {
              Platform.isWindows ? await windowManager.close(): log("Window Closing...");
            },
          ),
        ],
      ),
      body: InAppWebView(
        initialUrlRequest: URLRequest(
          url: WebUri("http://localhost:1059/index.html"),
        ),
        onWebViewCreated: (controller) {
          webViewController = controller;
          controller.evaluateJavascript(source: "document.addEventListener('contextmenu', event => event.preventDefault());");
        },
        shouldOverrideUrlLoading: (controller, navigationAction) async {
          final uri = navigationAction.request.url;
          if (uri != null &&
              (uri.path.endsWith('.pdf') ||
                  uri.path.endsWith('.zip') ||
                  uri.path.endsWith('.exe') ||
                  uri.path.endsWith('.apk') ||
                  uri.toString().contains("download"))) {
            return NavigationActionPolicy.CANCEL;
          }
          webViewController.evaluateJavascript(source: "document.addEventListener('contextmenu', event => event.preventDefault());");
          return NavigationActionPolicy.ALLOW;
        },
      ),
    );
  }
}
