cmd_Makefile := cd ..; /usr/lib/node_modules/node-gyp/gyp/gyp_main.py -fmake --ignore-environment "--toplevel-dir=." -I/home/shota/Desktop/addon/build/config.gypi -I/usr/lib/node_modules/node-gyp/addon.gypi -I/root/.node-gyp/6.11.2/include/node/common.gypi "--depth=." "-Goutput_dir=." "--generator-output=build" "-Dlibrary=shared_library" "-Dvisibility=default" "-Dnode_root_dir=/root/.node-gyp/6.11.2" "-Dnode_gyp_dir=/usr/lib/node_modules/node-gyp" "-Dnode_lib_file=/root/.node-gyp/6.11.2/<(target_arch)/node.lib" "-Dmodule_root_dir=/home/shota/Desktop/addon" "-Dnode_engine=v8" binding.gyp
