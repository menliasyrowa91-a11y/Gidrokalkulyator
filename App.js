import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
            * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
            html, body { height: 100%; margin: 0; padding: 0; background-color: #f4f6f9; }
            
            .wrapper { padding: 12px; min-height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
            .container { background: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); flex-grow: 1; }
            
            h2 { text-align: center; color: #1e3a8a; margin-top: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px; }
            
            .tab-container { display: flex; flex-wrap: wrap; background: #e2e8f0; padding: 4px; border-radius: 8px; margin-bottom: 15px; }
            .tab { width: 50%; text-align: center; padding: 10px 4px; font-size: 14px; font-weight: bold; color: #4a5568; cursor: pointer; border-radius: 6px; transition: 0.2s; }
            .tab.active { background: #1e3a8a; color: white; }
            
            .sub-tab-container { display: flex; background: #cbd5e1; padding: 3px; border-radius: 6px; margin-bottom: 12px; }
            .sub-tab { width: 50%; text-align: center; padding: 6px; font-size: 12px; font-weight: bold; color: #334155; cursor: pointer; border-radius: 4px; }
            .sub-tab.active { background: #0f172a; color: white; }

            .form-group { margin-bottom: 12px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 13px; color: #4b5563; }
            input, select { width: 100%; padding: 11px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; background-color: #fff; }
            
            button { width: 100%; background-color: #059669; color: white; border: none; padding: 13px; border-radius: 8px; font-size: 17px; font-weight: bold; cursor: pointer; margin-top: 15px; margin-bottom: 15px; }
            button:active { background-color: #047857; }
            
            .result-box { margin-top: 10px; padding: 15px; background-color: #eff6ff; border-left: 5px solid #2563eb; border-radius: 8px; display: none; }
            .result-title { font-weight: bold; color: #1e3a8a; margin-bottom: 8px; border-bottom: 1px solid #dbeafe; padding-bottom: 5px; font-size: 15px; }
            .result-item { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; }
            .highlight { font-weight: bold; color: #dc2626; font-size: 18px; margin-top: 4px; }
            
            .section { display: none; }
            .section.active { display: block; }

            .suwarysh-box { margin-top: 15px; padding: 15px; background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; }
            .suwarysh-title { font-weight: bold; color: #92400e; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #fde68a; padding-bottom: 5px; }
            
            .author-credits { text-align: center; font-size: 13px; color: #1e3a8a; font-weight: bold; margin-top: 25px; padding: 12px; background-color: #e0f2fe; border-radius: 8px; border: 1px solid #bae6fd; letter-spacing: 0.5px; }
        </style>
    </head>
    <body>

    <div class="wrapper">
        <div class="container">
            <h2>Gidrokalkulýator</h2>
            
            <div class="tab-container">
                <div id="tab-derya" class="tab active" onclick="switchMainTab('derya')">Derýa</div>
                <div id="tab-yap" class="tab" onclick="switchMainTab('yap')">Ýap (Kanal)</div>
            </div>

            <div id="sec-derya" class="section active">
                <div class="form-group">
                    <label>Derýanyň hanasy (Düýbi):</label>
                    <select id="derya_hana">
                        <option value="dasly">Daşly derýa hanasy (K = 0.78)</option>
                        <option value="toprakly" selected>Toprakly derýa hanasy (K = 0.82)</option>
                        <option value="betonly">Betonly derýa hanasy (K = 0.88)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Suw üsti ini (b_üsti), metr:</label>
                    <input type="number" id="derya_b_usti" value="5.0" step="0.01" inputmode="decimal">
                </div>
                <div class="form-group">
                    <label>Suw asty ini (b_asty), metr:</label>
                    <input type="number" id="derya_b_asty" value="3.5" step="0.01" inputmode="decimal">
                </div>
                <div class="form-group">
                    <label>Ortaça çuňluk (h), metr:</label>
                    <input type="number" id="derya_h" value="1.2" step="0.01" inputmode="decimal">
                </div>
                <div class="form-group">
                    <label>Baklaşka aralygy (L), metr:</label>
                    <input type="number" id="derya_L" value="10" step="0.1" inputmode="decimal">
                </div>
                <div class="form-group">
                    <label>Geçilen wagt (t), sekunt:</label>
                    <input type="number" id="derya_t" value="15.0" step="0.1" inputmode="decimal">
                </div>
            </div>

            <div id="sec-yap" class="section">
                <div class="sub-tab-container">
                    <div id="tab-acyk" class="sub-tab active" onclick="switchYapType('acyk')">Açyk Ýap</div>
                    <div id="tab-yapyk" class="sub-tab" onclick="switchYapType('yapyk')">Ýapyk Ýap (Turba)</div>
                </div>

                <div id="yap-acyk-fields">
                    <div class="form-group">
                        <label>Wodosliwiň düýbiniň ini (b), metr:</label>
                        <input type="number" id="wodo_b" value="0.50" step="0.01" inputmode="decimal">
                    </div>
                    <div class="form-group">
                        <label>Suwuň aşýan gatlagy (H), metr:</label>
                        <input type="number" id="wodo_H" value="0.15" step="0.001" inputmode="decimal">
                    </div>
                </div>

                <div id="yap-yapyk-fields" style="display: none;">
                    <div class="form-group">
                        <label>Turbanyň diametri (d):</label>
                        <select id="turba_d">
                            <option value="300" selected>ø d = 300 mm</option>
                            <option value="400">ø d = 400 mm</option>
                            <option value="500">ø d = 500 mm</option>
                            <option value="600">ø d = 600 mm</option>
                            <option value="700">ø d = 700 mm</option>
                            <option value="800">ø d = 800 mm</option>
                            <option value="900">ø d = 900 mm</option>
                            <option value="1000">ø d = 1000 mm</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Turbadaky suwuň çuňlygy (h), metr:</label>
                        <input type="number" id="turba_h" value="0.15" step="0.01" inputmode="decimal">
                    </div>
                    <div class="form-group">
                        <label>Akym tizligi (V), m/s:</label>
                        <input type="number" id="turba_V" value="0.9" step="0.1" inputmode="decimal">
                    </div>
                </div>
            </div>

            <button onclick="hasaplaÄhlisini()">HASAPLA</button>

            <div class="result-box" id="netijeZonasy">
                <div class="result-title">Akym Netijeleri:</div>
                <div class="result-item" id="res-meydan-row"><span>Akym kesik meýdany (F):</span> <span><strong id="resF">0</strong> m²</span></div>
                <div class="result-item" id="res-tizlik-row"><span>Tizlik (V):</span> <span><strong id="resV">0</strong> m/s</span></div>
                <div class="result-item highlight"><span>Suw sarpyny (Q):</span> <span id="resQm3">0 m³/s</span></div>
                <div class="result-item highlight"><span>Suw sarpyny (Litr):</span> <span id="resQlitr">0 l/s</span></div>
            </div>

            <div class="suwarysh-box">
                <div class="suwarysh-title">Suwaryş we Gektar Meýilnamasy</div>
                
                <div class="form-group">
                    <label>Suwaryş normasy (m), m³/ga:</label>
                    <input type="number" id="mel_m" value="1400" step="50" inputmode="decimal" oninput="hasaplaMeliorasiya()">
                </div>
                
                <div class="form-group">
                    <label>Ýitgi koeffisienti (КПД):</label>
                    <select id="mel_yitgi" onchange="hasaplaMeliorasiya()">
                        <option value="0.80" selected>0.80 (Adaty toprakly ýap)</option>
                        <option value="0.85">0.85 (Gowy arassalanan ýap)</option>
                        <option value="0.90">0.90 (Betonlanan ýap / Turba)</option>
                    </select>
                </div>

                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #fcd34d; margin-bottom: 12px;">
                    <div style="font-weight: bold; color: #92400e; font-size: 13px; margin-bottom: 5px;">📊 1 GÜNDIKI (24 SAGAT) SUWARÝAN MEÝDANY:</div>
                    <div class="highlight" id="meydanNetije" style="color: #047857; font-size: 22px; font-weight: 900;">0.00 gektar</div>
                </div>

                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #fcd34d;">
                    <div style="font-weight: bold; color: #92400e; font-size: 13px; margin-bottom: 5px;">⏳ ÖZ GEKTARYŇYZA GÖRÄ WAGT TAPMAK:</div>
                    <div class="form-group" style="margin-top: 5px;">
                        <label style="font-weight: normal; font-size: 12px; color: #555;">Meýdan giriziň (Gektar):</label>
                        <input type="number" id="mel_S" value="10" step="1" inputmode="decimal" oninput="hasaplaMeliorasiya()">
                    </div>
                    <div style="font-weight: bold; color: #b45309; font-size: 14px; margin-top: 5px;" id="wagtNetije">
                        0 sagat gerek.
                    </div>
                </div>
            </div>
            
            <div class="author-credits">
                💻 Düzüji: Meňli Aşyrowa
            </div>
        </div>
    </div>

    <script>
    let mainTab = 'derya';
    let yapType = 'acyk';
    let häzirkiQ = 0; 

    const tabelaF = {
        "300": { 0.00: 0.0000, 0.05: 0.0076, 0.10: 0.0234, 0.15: 0.0413, 0.20: 0.0582, 0.25: 0.0669, 0.30: 0.0706 },
        "400": { 0.00: 0.0000, 0.05: 0.0090, 0.10: 0.0281, 0.15: 0.0509, 0.20: 0.0707, 0.25: 0.0867, 0.30: 0.1046, 0.40: 0.1256 },
        "500": { 0.00: 0.0000, 0.05: 0.0102, 0.10: 0.0317, 0.15: 0.0584, 0.20: 0.0832, 0.30: 0.1330, 0.40: 0.1725, 0.50: 0.1962 },
        "600": { 0.00: 0.0000, 0.10: 0.0352, 0.20: 0.0935, 0.30: 0.1591, 0.40: 0.2167, 0.50: 0.2603, 0.60: 0.2826 },
        "700": { 0.00: 0.0000, 0.10: 0.0384, 0.20: 0.1033, 0.30: 0.1785, 0.40: 0.2480, 0.50: 0.3065, 0.60: 0.3603, 0.70: 0.3847 },
        "800": { 0.00: 0.0000, 0.10: 0.0418, 0.20: 0.1123, 0.30: 0.1875, 0.40: 0.2669, 0.50: 0.3389, 0.60: 0.4116, 0.70: 0.4714, 0.80: 0.5024 },
        "900": { 0.00: 0.0000, 0.10: 0.0445, 0.20: 0.1199, 0.30: 0.2013, 0.40: 0.2823, 0.50: 0.3715, 0.60: 0.4592, 0.70: 0.5387, 0.80: 0.5972, 0.90: 0.6358 },
        "1000": { 0.00: 0.000, 0.10: 0.047, 0.20: 0.127, 0.30: 0.216, 0.40: 0.303, 0.50: 0.402, 0.60: 0.502, 0.70: 0.596, 0.80: 0.682, 0.90: 0.750, 1.00: 0.785 }
    };

    function switchMainTab(tab) {
        mainTab = tab;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById('tab-' + tab).classList.add('active');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('sec-' + tab).classList.add('active');
        häzirkiQ = 0;
        document.getElementById('netijeZonasy').style.display = 'none';
    }

    function switchYapType(type) {
        yapType = type;
        document.getElementById('tab-acyk').classList.remove('active');
        document.getElementById('tab-yapyk').classList.remove('active');
        document.getElementById('tab-' + type).classList.add('active');
        
        if(type === 'acyk') {
            document.getElementById('yap-acyk-fields').style.display = 'block';
            document.getElementById('yap-yapyk-fields').style.display = 'none';
        } else {
            document.getElementById('yap-acyk-fields').style.display = 'none';
            document.getElementById('yap-yapyk-fields').style.display = 'block';
        }
        häzirkiQ = 0;
        document.getElementById('netijeZonasy').style.display = 'none';
    }

    function hasaplaÄhlisini() {
        let F = 0, V = 0, Q = 0;
        document.getElementById('res-meydan-row').style.display = 'flex';
        document.getElementById('res-tizlik-row').style.display = 'flex';

        if (mainTab === 'derya') {
            let b_usti = parseFloat(document.getElementById('derya_b_usti').value);
            let b_asty = parseFloat(document.getElementById('derya_b_asty').value);
            let h = parseFloat(document.getElementById('derya_h').value);
            let L = parseFloat(document.getElementById('derya_L').value);
            let t = parseFloat(document.getElementById('derya_t').value);
            let hana = document.getElementById('derya_hana').value;

            if (isNaN(b_usti) || isNaN(b_asty) || isNaN(h) || isNaN(t) || t <= 0) {
                alert("Ölçegleri dolduryň!"); return;
            }

            let K = 0.82; 
            if(hana === "dasly") K = 0.78;
            if(hana === "betonly") K = 0.88;

            F = ((b_usti + b_asty) / 2) * h;
            let V_yuz = L / t;
            V = V_yuz * K;
            Q = F * V;

            document.getElementById('resF').innerText = F.toFixed(2);
            document.getElementById('resV').innerText = V.toFixed(2);

        } else if (mainTab === 'yap' && yapType === 'acyk') {
            let b = parseFloat(document.getElementById('wodo_b').value);
            let H = parseFloat(document.getElementById('wodo_H').value);

            if (isNaN(b) || isNaN(H) || b <= 0 || H <= 0) {
                alert("Wodosliw ölçeglerini giriziň!"); return;
            }

            Q = 1.86 * b * Math.pow(H, 1.5);
            document.getElementById('res-meydan-row').style.display = 'none';
            document.getElementById('res-tizlik-row').style.display = 'none';

        } else if (mainTab === 'yap' && yapType === 'yapyk') {
            let diametr = document.getElementById('turba_d').value;
            let h = parseFloat(document.getElementById('turba_h').value);
            let v_input = parseFloat(document.getElementById('turba_V').value);

            if (isNaN(h) || h < 0 || isNaN(v_input)) {
                alert("Turbanyň çuňlygyny giriziň!"); return;
            }

            let golaýH = (Math.round(h * 10) / 10).toFixed(2); 
            if (tabelaF[diametr] && tabelaF[diametr][golaýH] !== undefined) {
                F = tabelaF[diametr][golaýH];
            } else {
                let jemi_asg_H = (diametr / 1000).toFixed(1);
                F = tabelaF[diametr][jemi_asg_H] || 0.1;
            }

            V = v_input;
            Q = F * V;

            document.getElementById('resF').innerText = F + " m² (Şezi)";
            document.getElementById('resV').innerText = V.toFixed(2);
        }

        häzirkiQ = Q; 
        let Q_litr = Q * 1000;
        document.getElementById('resQm3').innerText = Q.toFixed(3) + " m³/s";
        document.getElementById('resQlitr').innerText = Math.round(Q_litr) + " l/s";
        
        document.getElementById('netijeZonasy').style.display = 'block';
        hasaplaMeliorasiya(); 
    }

    function hasaplaMeliorasiya() {
        if (häzirkiQ <= 0) return;
        
        let m = parseFloat(document.getElementById('mel_m').value);
        let yitgi = parseFloat(document.getElementById('mel_yitgi').value);
        let S_isleg = parseFloat(document.getElementById('mel_S').value);
        
        if (isNaN(m) || m <= 0) return;

        let Q_litr = häzirkiQ * 1000;
        let jemi_gektar_sutka = (Q_litr * yitgi * 86400) / (m * 1000);
        document.getElementById('meydanNetije').innerText = jemi_gektar_sutka.toFixed(2) + " gektar";

        if (!isNaN(S_isleg) && S_isleg > 0) {
            let jemi_gundiz_wagt = (S_isleg * m) / (häzirkiQ * yitgi * 86400);
            
            let gundiz_bolum = Math.floor(jemi_gundiz_wagt);
            let galan_sagat = (jemi_gundiz_wagt - gundiz_bolum) * 24;
            let sagat_bolum = Math.floor(galan_sagat);
            let minut_bolum = Math.round((galan_sagat - sagat_bolum) * 60);

            let txt = "";
            if(gundiz_bolum > 0) txt += gundiz_bolum + " gije-gündiz ";
            if(sagat_bolum > 0 || gundiz_bolum > 0) txt += sagat_bolum + " sagat ";
            txt += minut_bolum + " minut.";
            
            document.getElementById('wagtNetije').innerText = txt;
        }
    }
    </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
