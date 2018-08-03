from flask import Flask, request, Response, render_template
import json
import argparse

app = Flask(__name__)

@app.route('/compute/method/groums', methods=['POST'])
def search_pattern():


    pattern_detail = {
        "groum_keys_t":["ramonrabello/Falasumano/86aaa8be9d96b4f34b16d0c3cbc5d771b3df65a9/androidnarede.exemplo.tts.MainActivity$1/run",
                        "musart/amarino-phonegap/995c619a264b06d8161e1a7e6f1e93d8736ff169/at.abraxas.amarino.AmarinoService$ConnectedThread/forwardDataToOtherApps",
                        "SueSmith/android-speak-repeat/f6039b53b561fa54f8ea20873209dc4e8bb807ad/com.example.speakrepeat.SpeechRepeatActivity/listenToSpeech",
                        "longdw/MyMusic/147df6374adecf6c3a33dd92069df9b319e2e88a/com.ldw.music.service.MusicControl/sendBroadCast",
                        "LittlePanpc/android-download-manager/a9e7defe23d954ea23ed890f138b2e091e368acc/com.littlepanpc.download.services.DownloadManager$1/updateProcess",
                        "life0fun/Android-Webview-Ajax/c24f345644a3608f2f02aa1db9c3f7f9d53550cb/com.mot.ajaxwebapp.ShareUtils/onAddCalendarEvent",
                        "Pushwoosh/pushwoosh-android-sdk/c77907185161325fbb777a376a2abaf6621fce44/com.pushwoosh.thirdparty.a.a.c/a",
                        "Pushwoosh/pushwoosh-android-sdk/c77907185161325fbb777a376a2abaf6621fce44/com.pushwoosh.thirdparty.a.a.h/a",
                        "ajaysaini-sgvu/crash-report/ef45287cbb3c8ad6b9b71cf754b058ebdd6a8275/com.tgmcians.crashhandler.CrashActivity/sendErrorMail",
                        "Timothy1101/AndroidAPIGuideApp/3bd42a1e826266e8e56ce2f6b60c6815ff2691e5/com.timothy.android.crash.CrashHandler/doSendLogFile",
                        "zjc3909/QuickDial/4a66c9e3f0e6016d42a80e90b23c0801eb1b7af4/com.zhuang.quickcall.utils.EmailSender/sendEmail",
                        "phubbard/Meltdown/7bcda6825679d44a4905628f4cbd45ef9bc50589/net.phfactor.meltdown.activities.ItemDisplayActivity/oneWeek",
                        "samicemalone/android-vlc-remote/34df0e8dadf8994aa8677c4f4a82dc8a4ecc99ce/org.peterbaldwin.vlcremote.fragment.PlaylistFragment/searchForItem",
                        "Pedrolo/ID_Checker/8a4f9c6888e007cc3c923cf5530bbd6c77a4c0a3/pedrolo.idChecker.SaldoActivity/abreMovimientos",
                        "danishcake/ShokoRocketAndroid/9705749bec52949f24e5d5ec50b5737b480d5501/uk.danishcake.shokorocket.moding.ModeEditor$6/onClick",
                        "api-ai/api-ai-android-sdk/0592c1a23138c6d1a90f6858c23142aedc3db60d/ai.api.services.GoogleRecognitionServiceImpl/createRecognitionIntent",
                        "ProjPossibility/2014-CSUN-Cam4Blind/07981314bafd444aa5d5bdb474430dab23dae113/com.camacc.service.Voice_Engine/onCreate",
                        "shakalaca/learning_gradle_android/62c9ae9cdb99c55afcc0ca3739774c214eeef50a/com.actionbarsherlock.widget.SearchView/createVoiceAppSearchIntent",
                        "shakalaca/learning_gradle_android/62c9ae9cdb99c55afcc0ca3739774c214eeef50a/com.actionbarsherlock.widget.SearchView/createIntent",
                        "alexvasilkov/FoldableLayout/68d4ee59379363a2e022fb950f574069a2734350/com.alexvasilkov.android.commons.utils.Intents$EmailBuilder/open",
                        "52inc/android-52Kit/336fae357a9018cd42f50b02a664082e6af8439f/com.ftinc.kit.util.IntentUtils/cropImage",
                        "chenxiaolong/CM_packages_apps_OpenDelta/62ff849305349d106d575c08f38ace1e7c4e8db9/eu.chainfire.opendelta.UpdateService/updateState",
                        "Adonai/NoLife-Player/2627a61c35f28a2c251923469d30485164f57280/org.adonai.nolife.PlaybackService/stockMusicBroadcast",
                        "saykent/vanilla/9e522eb24e097d21df42265b1aaf3f7305c6c760/org.kreed.vanilla.PlaybackService/stockMusicBroadcast",
                        "johnm1/john_flyingf4/5b4d5a09c9383b2885819c6ac315cd9a54cbf5fe/org.taulabs.androidgcs.Logger$1/onItemClick",
                        "denzilferreira/aware-client/537e709dedefba23255700be8af028ea415f3923/com.aware.utils.Scheduler/performAction",
                        "lioncash/droidsound/996c512c8b378dfcd4539295efe626d80e28b30b/com.ssb.droidsound.async.Player/sendLoadingWithSubsong",
                        "joinAero/AndroidWebServ/72c215a0549ab314bb1677dd8b097fd315193429/org.join.zxing.CaptureActivity/handleDecode",
                        "jessitron/Tronsmit/2aba4ba56ac8bf21333bed881b232fbb3b81a929/com.jessitron.tronsmit.TronsmitActivity$SendIntentCreator/createSendIntent",
                        "nightscout/android-uploader/1b649e67b09301fca5ea99b20cc64cd7381d7a56/com.google.zxing.client.android.CaptureActivity/handleDecodeExternally",
                        "nightscout/android-uploader/1b649e67b09301fca5ea99b20cc64cd7381d7a56/com.google.zxing.client.androidlegacy.CaptureActivity/handleDecodeExternally",
                        "raimondz/Ditapp/d3a5500ab2a30bb2aa06744efe843f8e261e29d8/com.journeyapps.barcodescanner.CaptureManager/resultIntent",
                        "manishsri01/CameraGallerySqliteDemo/773bd7c1816f123ab084b4fb4a1c67138cbdf933/com.manish.sqlite.SQLiteDemoActivity/callCamera",
                        "christandiono/k-9/b1a1de8f7b829e8a07e74c5e79eeb1b29bb19d42/com.fsck.k9.controller.MessagingController$27/loadMessageForViewBodyAvailable",
                        "SeBBBe/iidenki-android/e3f8850b45b666e017c88bd4fa41eb9404e3b0e1/iidenki.android.KanjiTestMenu/onClick",
                        "SeBBBe/iidenki-android/e3f8850b45b666e017c88bd4fa41eb9404e3b0e1/iidenki.android.WordTestMenu/onClick",
                        "vendetta1987/Memo_2.0/75d433ef98547ca0f249ea8d2bbb4c0b1afd2aac/de.planetic.android.memo.Navigation_AsyncTask/onPostExecute",
                        "danielegobbetti/ICSImport/742f10d525b8b6c3156eb5332f60af85ff00cbf6/org.dgtale.icsimport.MainActivity/onCreate",
                        "Afterglow375/CryptoChat/62c3bf1ff34c14653d3764b3820d3bc487a01ade/frontend.NewMessageActivity$1/onClick",
                        "SeBBBe/iidenki-android/e3f8850b45b666e017c88bd4fa41eb9404e3b0e1/iidenki.android.FileLoaderInt/onItemClick",
                        "SeBBBe/iidenki-android/e3f8850b45b666e017c88bd4fa41eb9404e3b0e1/iidenki.android.FileLoaderSD/onItemClick"],
        "groum_dot_sni":"digraph isoX {\n node[shape=box,style=\"filled,rounded\",penwidth=2.0,fontsize=13,]; \n\t edge[ arrowhead=onormal,penwidth=2.0,]; \n\n\"n_10\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #10: android.content.Intent  intent\"];\n\"n_31\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #31: java.lang.String  \\'android.speech.extra.MAX_RESULTS\\'\"];\n\"n_28\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #28: byte  MAX_OCORRENCIAS\"];\n\"n_32\" [ shape=box, style=filled, color=lightgray, label=\" android.content.Intent.putExtra[#10](#31, #28)\"];\n\"n_4\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #4: android.content.Intent  $r0\"];\n\"n_7\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #7: java.lang.String  \\'android.speech.action.RECOGNIZE_SPEECH\\'\"];\n\"n_8\" [ shape=box, style=filled, color=lightgray, label=\" android.content.Intent.<init>[#4](#7)\"];\n\"n_18\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #18: java.lang.String  \\'android.speech.extra.PROMPT\\'\"];\n\"n_19\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #19: java.lang.String  \\'Faaaaala sumano: (ex: android)\\'\"];\n\"n_20\" [ shape=box, style=filled, color=lightgray, label=\" android.content.Intent.putExtra[#10](#18, #19)\"];\n\"n_23\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #23: java.lang.String  \\'android.speech.extra.LANGUAGE_MODEL\\'\"];\n\"n_24\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #24: java.lang.String  \\'web_search\\'\"];\n\"n_25\" [ shape=box, style=filled, color=lightgray, label=\" android.content.Intent.putExtra[#10](#23, #24)\"];\n\"n_13\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #13: java.lang.String  \\'calling_package\\'\"];\n\"n_14\" [shape=ellipse,color=red,style=dashed,label=\"DataNode #14: java.lang.String  $r3\"];\n\"n_15\" [ shape=box, style=filled, color=lightgray, label=\" android.content.Intent.putExtra[#10](#13, #14)\"];\n\"n_10\" -> \"n_15\"[color=green, penwidth=2];\n\"n_14\" -> \"n_15\"[color=green, penwidth=2];\n\"n_23\" -> \"n_25\"[color=green, penwidth=2];\n\"n_10\" -> \"n_20\"[color=green, penwidth=2];\n\"n_10\" -> \"n_32\"[color=green, penwidth=2];\n\"n_19\" -> \"n_20\"[color=green, penwidth=2];\n\"n_13\" -> \"n_15\"[color=green, penwidth=2];\n\"n_4\" -> \"n_8\"[color=green, penwidth=2];\n\"n_28\" -> \"n_32\"[color=green, penwidth=2];\n\"n_24\" -> \"n_25\"[color=green, penwidth=2];\n\"n_7\" -> \"n_8\"[color=green, penwidth=2];\n\"n_18\" -> \"n_20\"[color=green, penwidth=2];\n\"n_10\" -> \"n_25\"[color=green, penwidth=2];\n\"n_31\" -> \"n_32\"[color=green, penwidth=2];\n\"n_15\" -> \"n_20\"[color=black, penwidth=3];\n\"n_20\" -> \"n_25\"[color=black, penwidth=3];\n\"n_25\" -> \"n_32\"[color=black, penwidth=3];\n\"n_8\" -> \"n_15\"[color=black, penwidth=3];\n } \n",
        "type_sni":"popular",
        "frequency_sni":"56",
        "cluster_key_sni":"22",
        "doc_type_sni":"pattern",
        "id":"22/popular/8",
        "_version_":1565781171596427265
    }

    pattern_val = {"weight" : "0.750974", "key" : "22/popular/8",
                   "iso_dot" : "", "pattern" : pattern_detail}

    reply_json = {"patterns" : [pattern_val]}

    return Response(json.dumps(reply_json),
                    status=200,
                    mimetype='application/json')





def flaskrun(app, default_host="127.0.0.1", default_port="5000"):

    parser = argparse.ArgumentParser(description='Manage Flask')
    parser.add_argument('--h', '--host', type=str, default=default_host,
                        help="Hostname of the Flask app " + \
                             "[default %s]" % default_host)

    parser.add_argument('--p', '--port', type=str, default=default_port,
                        help="Port for the Flask app " + \
                             "[default %s]" % default_port)
    args = parser.parse_args()

    app.run(
        debug=True,
        host=args.h,
        port=int(args.p)
    )


if __name__ == '__main__':
    flaskrun(app)
  #app.run(debug=True)
