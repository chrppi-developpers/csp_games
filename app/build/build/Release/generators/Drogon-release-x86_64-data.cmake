########### AGGREGATED COMPONENTS AND DEPENDENCIES FOR THE MULTI CONFIG #####################
#############################################################################################

set(drogon_COMPONENT_NAMES "")
list(APPEND drogon_FIND_DEPENDENCY_NAMES Trantor jsoncpp OpenSSL libuuid Boost ZLIB)
list(REMOVE_DUPLICATES drogon_FIND_DEPENDENCY_NAMES)
set(Trantor_FIND_MODE "NO_MODULE")
set(jsoncpp_FIND_MODE "NO_MODULE")
set(OpenSSL_FIND_MODE "NO_MODULE")
set(libuuid_FIND_MODE "NO_MODULE")
set(Boost_FIND_MODE "NO_MODULE")
set(ZLIB_FIND_MODE "NO_MODULE")

########### VARIABLES #######################################################################
#############################################################################################
set(drogon_PACKAGE_FOLDER_RELEASE "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/b/drogo99e6d605690dd/p")
set(drogon_BUILD_MODULES_PATHS_RELEASE )


set(drogon_INCLUDE_DIRS_RELEASE "${drogon_PACKAGE_FOLDER_RELEASE}/include")
set(drogon_RES_DIRS_RELEASE )
set(drogon_DEFINITIONS_RELEASE )
set(drogon_SHARED_LINK_FLAGS_RELEASE )
set(drogon_EXE_LINK_FLAGS_RELEASE )
set(drogon_OBJECTS_RELEASE )
set(drogon_COMPILE_DEFINITIONS_RELEASE )
set(drogon_COMPILE_OPTIONS_C_RELEASE )
set(drogon_COMPILE_OPTIONS_CXX_RELEASE )
set(drogon_LIB_DIRS_RELEASE "${drogon_PACKAGE_FOLDER_RELEASE}/lib")
set(drogon_BIN_DIRS_RELEASE )
set(drogon_LIBRARY_TYPE_RELEASE STATIC)
set(drogon_IS_HOST_WINDOWS_RELEASE 0)
set(drogon_LIBS_RELEASE drogon)
set(drogon_SYSTEM_LIBS_RELEASE )
set(drogon_FRAMEWORK_DIRS_RELEASE )
set(drogon_FRAMEWORKS_RELEASE )
set(drogon_BUILD_DIRS_RELEASE )
set(drogon_NO_SONAME_MODE_RELEASE FALSE)


# COMPOUND VARIABLES
set(drogon_COMPILE_OPTIONS_RELEASE
    "$<$<COMPILE_LANGUAGE:CXX>:${drogon_COMPILE_OPTIONS_CXX_RELEASE}>"
    "$<$<COMPILE_LANGUAGE:C>:${drogon_COMPILE_OPTIONS_C_RELEASE}>")
set(drogon_LINKER_FLAGS_RELEASE
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,SHARED_LIBRARY>:${drogon_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,MODULE_LIBRARY>:${drogon_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,EXECUTABLE>:${drogon_EXE_LINK_FLAGS_RELEASE}>")


set(drogon_COMPONENTS_RELEASE )