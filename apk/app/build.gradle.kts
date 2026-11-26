import org.gradle.api.tasks.Sync

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.blackcat.wiki"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.blackcat.wiki"
        minSdk = 26
        targetSdk = 34
        versionCode = 801
        versionName = "0.8.1"

        val updateUrl = (project.findProperty("updateManifestUrl") as String?)
            ?: "https://github.com/R1haraYu/fantasy-cat-wiki/releases/latest/download/latest.json"
        buildConfigField("String", "UPDATE_MANIFEST_URL", "\"$updateUrl\"")
        buildConfigField("String", "APP_VERSION", "\"0.8.1\"")
    }

    buildFeatures {
        buildConfig = true
    }

    sourceSets {
        getByName("main") {
            // Site files are generated into build/ so the source tree is not
            // duplicated. Local: ../site. GitHub root-site: -PwikiSiteDir=..
            assets.srcDirs(
                "src/main/assets",
                layout.buildDirectory.dir("generated/wiki-assets")
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    // Assets are compressed by the Android packager by default. The wiki is
    // intentionally large because it is the complete offline site.
}

val wikiSiteDir = providers.gradleProperty("wikiSiteDir").orElse("../../site")
val generatedWikiAssets = layout.buildDirectory.dir("generated/wiki-assets")
val prepareWikiAssets = tasks.register<Sync>("prepareWikiAssets") {
    from(wikiSiteDir.get()) {
        exclude("apk/**", ".github/**", ".git/**", "build-release/**", "release/**", "README*")
    }
    into(generatedWikiAssets)
}

tasks.named("preBuild").configure { dependsOn(prepareWikiAssets) }

dependencies {
}
